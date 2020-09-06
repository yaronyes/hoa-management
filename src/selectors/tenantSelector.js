import { sortByDate } from '../utils/utils';

export default (tenants, { text, sortBy, sortDirection }) => 
    tenants.filter(item => item.name.toLowerCase().includes(text.toLowerCase().trim())).sort((a, b) => sortByDate(a[sortBy], b[sortBy], sortDirection));
    