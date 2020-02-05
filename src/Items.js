import React, {useState} from 'react';
import Item from "./Item";
import List from '@material-ui/core/List'
import {JsonSerializers, RSocketClient,} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

const client = new RSocketClient({
    serializers: JsonSerializers,
    setup: {
        keepAlive: 60000,
        lifetime: 180000,
        dataMimeType: 'application/json',
        metadataMimeType: 'application/json',
    },
    transport: new RSocketWebSocketClient({url: 'ws://localhost:7000/items'}),
});


export default function Items() {
    const [items, setItems] = useState([]);
    client.connect().subscribe({
        onComplete: socket => {
            socket.requestStream('Sporting Goods').subscribe({
                onNext: (item) => {
                    items.push(item);
                    console.log(items);
                },
                onSubscribe: () => console.log('Subscription'),
                onComplete: () => console.log('Complete')
            })
        },
        onError: error => console.error(error)
    });

    return items.map((item) => {
        return (
            <List>
                <Item item={item}/>
            </List>
        )
    });
}