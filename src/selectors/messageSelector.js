import { compareByDate, compareByPriority } from '../utils/utils';

const priorities = {
    important: 1,
    info: 2
  }

export default (messages, { text, sortBy, priority }) => 
    messages.filter(message => (message.title.toLowerCase().includes(text.toLowerCase().trim())) && (priority ? (message.priority === priority) : true))
    .sort((a, b) => sortBy === 'createdAt' ? compareByDate(a[sortBy], b[sortBy]) : compareByPriority(a[sortBy], b[sortBy], priorities));
    