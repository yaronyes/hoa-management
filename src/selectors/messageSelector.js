import { compareByDate, compareByPriority, compareByDateDesc } from '../utils/utils';

const priorities = {
    important: 1,
    info: 2
  }

const sortByDate = (a, b, sortDirection) => sortDirection === 'asc' ? compareByDate(a, b) : compareByDateDesc(a, b);

export default (messages, { text, sortBy, priority, sortDirection }) => 
    messages.filter(message => (message.title.toLowerCase().includes(text.toLowerCase().trim())) && (priority ? (message.priority === priority) : true))
    .sort((a, b) => sortBy === 'createdAt' ? sortByDate(a[sortBy], b[sortBy], sortDirection) : compareByPriority(a[sortBy], b[sortBy], priorities));
    