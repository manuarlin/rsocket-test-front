import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from '@material-ui/core/ListItemText';
import SportsIcon from '@material-ui/icons/Sports';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';

export default function Item(props) {
    const item = props.item;
    return (
        <ListItem>
            <ListItemIcon>
                {item.category === 'Sporting Goods' ? <SportsIcon/> : <MobileScreenShareIcon/>}
            </ListItemIcon>
            <ListItemText primary={item.name} secondary={item.price}/>
        </ListItem>
    )
}