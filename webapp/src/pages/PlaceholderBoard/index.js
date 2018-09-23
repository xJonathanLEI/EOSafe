import React, { Component } from 'react';
import { Card, Col, Row, Divider, Modal, Input } from 'antd';

import ExpenditureDisplay from "../../components/ExpenditureDisplay";
import PageWithModal from "../../components/PageWithModal";

class PlaceholderBoard extends PageWithModal {
    constructor(props) {
        super(props);

    }


    getModal() {
        return super.getModal();
    }

    getPageContainer() {
        return super.getPageContainer();
    }
}

export default PlaceholderBoard;
