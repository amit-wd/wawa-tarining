import { get, mockDelay } from '../API';

export const getData = () => mockDelay<any>(get(`posts/`));
