import * as React from "react";
import {Card} from "antd";
import {CardProps} from "antd/lib/card";


interface IProps {

}

export class CardComponent extends React.Component<CardProps, IProps> {
    render() {
        return <Card
                     title={this.props.title}
                     extra={this.props.extra}
        >

        </Card>;
    }
}
