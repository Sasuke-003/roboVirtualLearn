import axios from 'axios';

export const virtualLearnBaseUrl = 'https://virtual-learn-api.herokuapp.com';

export const virtualLearn = axios.create({baseURL: virtualLearnBaseUrl});
