import React from 'react';
import axios from "axios";
import "./Admin.style.scss";

const API_PATH = 'http://localhost/magebit/api/newsletter/admin.php';

class AdminPage extends React.PureComponent {

    constructor() {
        super();
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleProviderChange = this.handleProviderChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleDeleteAction = this.handleDeleteAction.bind(this);
        this.handleAddToDelete = this.handleAddToDelete.bind(this);
    }

    state = {
        email: '',
        providers: [],
        selectedProvider: [],
        emailsToDelete: [],
        response: null,
        error: null
    };

    componentDidMount() {
        this.handleFormSubmit();
    }

    identifyProviders() {
        const { providers, response } = this.state;
        // eslint-disable-next-line no-useless-escape
        const providerRegex = /^([\w-\.]{1,})@(([a-zA-Z\-0-9]+\.)+([a-zA-Z]{2,}))$/g;

        for (var i = 0; i < response.length; i++ ){
            const matches = response[i].email.matchAll(providerRegex);
            for (const match of matches) {
                //match[2] returns 3rd match group of regex (provider like gmail.com), uncomment next line to see all groups
                // console.log(match);

                if(!providers.includes(match[2])) {
                    providers.push(match[2])
                }
            }
        }
        this.setState({ providers });
    }

    sortTableOnHeaderClick(e, key){
        e.preventDefault();
        var n = key === "email" ? 0 : (key === "date_added" ? 1 : 0);
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("MyHTMLTable") ;
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table === null ? 0 : table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount === 0 && dir === "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }

    }

    slowRemoveFromArray(array, item) {
        for( var i = 0; i < array.length; i++){
            if ( array[i] === item) {
                array.splice(i, 1);
            }
        }
        return array;
    }

    handleFormSubmit() {
        axios({
            method: 'post',
            url: API_PATH,
            headers: { 'content-type': 'application/json' },
            data: this.state
        }).then(result => {
            this.setState({ response: result.data.response });
        }).catch(error => {
            this.setState({ error: error.message });
            console.log(error.message);
        });
    }

    handleProviderChange(e) {
        e.preventDefault();
        this.setState({ selectedProvider: e.target.value })
    }

    handleEmailChange(e) {
        e.preventDefault();
        this.setState({ email: e.target.value })
    }

    handleDeleteAction(e){
        e.preventDefault();
        axios({
            method: 'post',
            url: API_PATH,
            headers: { 'content-type': 'application/json' },
            data: this.state
        }).then(result => {
            this.setState({ emailsToDelete: [] });
            console.log(result.data.deleteSuccess);
            this.handleFormSubmit();
        }).catch(error => {
            this.setState({ error: error.message });
            console.log(error.message);
        });
    }

    handleAddToDelete(e){
        const { emailsToDelete } = this.state;
        var email = e.target.id;

        if(e.target.checked && !emailsToDelete.includes(email)){
            emailsToDelete.push(email);
            this.setState({ emailsToDelete })
        } else if (!e.target.checked && emailsToDelete.includes(email)) {
            this.setState({ emailsToDelete: this.slowRemoveFromArray(emailsToDelete, email) })
        }
    }

    populateProviders() {
        const { providers } = this.state;
        return Object.entries(providers).map(([key, value]) => {
            return (
                <option key={ key } value={ value }>{ value }</option>
            );
        })
    }

    renderProviders() {
        const { providers } = this.state;

        return providers.length > 0 ? (
            <select
                name="Providers-Select"
                id="Providers-Select"
                onChange={ this.handleProviderChange }
                defaultValue=""
            >
                <option value="">No Provider</option>
                { this.populateProviders() }
            </select>
        ) : (
            <select name="Providers-Select" id="Providers-Select">
                <option>No Providers</option>
            </select>
        )
    }

    renderTableHeader(headers) {
        return Object.entries(headers).map(([key,value]) => {
            return (
                <th key={ key } onClick={e => this.sortTableOnHeaderClick(e,key) }>{ key }</th>
            );
        })
    }
    renderTableBody(tableData) {
        return Object.entries(tableData).map(([key,value]) => {
            return (
                <tr key={ key }>
                    { this.renderTableBodyData(value) }
                    <input onChange={ this.handleAddToDelete } type="checkbox" key={ value.email } name={ key } id={ value.email } />
                </tr>
            );
        })
    }

    renderTableBodyData(data) {
        return Object.entries(data).map(([key,value]) => {
            return (
                <td >{ value }</td>
            );
        })
    }

    renderTable() {
        const { response } = this.state;
        return(
            <table id="MyHTMLTable">
                <tr>
                    { this.renderTableHeader(response[0]) }
                    <th onClick={ this.handleDeleteAction } className="DeleteRows">Delete</th>
                </tr>
                { this.renderTableBody(response) }
            </table>
        );
    }

    render() {
        const { response, providers } = this.state;
        if (response) {
            this.identifyProviders();
        }
        return (
            <div className="Admin">
                <input
                    type="email"
                    placeholder="Email"
                    onChange={ this.handleEmailChange }
                />
                { providers.length>0 ? this.renderProviders() : null }
                <button onClick={ this.handleFormSubmit }> Submit </button>
                { response ? this.renderTable() : null }
            </div>
        );
    }
}

export default AdminPage;