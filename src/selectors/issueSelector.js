import { compareByDate, compareByPriority } from '../utils/utils';

const priorities = {
    urgent: 1,
    important: 2,
    normal: 3
  }

export default (issues, { text, sortBy }, status) => 
  (!status) 
   ? issues.filter(issue => issue.title.toLowerCase().includes(text.toLowerCase().trim()))
    .sort((a, b) => sortBy === 'createdAt' ? compareByDate(a[sortBy], b[sortBy]) : compareByPriority(a[sortBy], b[sortBy], priorities)) 
   : issues.filter(issue => issue.status === status);

  
    