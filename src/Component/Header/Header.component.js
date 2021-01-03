import React from 'react';
import './Header.style.scss';
import { HeaderLinks } from "./Header.config";

export default class Header extends React.PureComponent {
    renderHeaderMenu() {
        return (
            <div className="Nav-Menu">
                { Object.entries(HeaderLinks).map(([key, value]) => {
                    return (
                        <a className="Nav-Link" key={value.name} href={ value.link }><p>{ value.name }</p></a>
                    );
                })}
            </div>
        );
    }

    renderSocialMediaLinks() {

    }

    render () {
        return (
            <div className="Header">
                <a href="/">
                    <div className="Logo-Container">
                        <div className="Logo-Picture"/>
                        <div className="Logo-Text">
                            pineapple.
                        </div>
                    </div>
                </a>

                { this.renderHeaderMenu() }
            </div>
        );
    };
}
