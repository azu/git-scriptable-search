// LICENSE : MIT
"use strict";
import React from "react"
export default class BaseComponent extends React.Component {
    /**
     * for react-devtools
     * @returns {string}
     */
    getDisplayName() {
        return Object.getPrototypeOf(this).constructor.name;
    }
}
