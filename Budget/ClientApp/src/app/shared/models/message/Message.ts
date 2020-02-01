import {MessagesTypes} from '../../enums/MessagesTypes';

export interface Message {
    type: MessagesTypes;
    text: string;
}
