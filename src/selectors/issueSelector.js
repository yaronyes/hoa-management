import { compareByDate, compareByPriority } from '../utils/utils';
import moment from 'moment';

const priorities = {
    urgent: 1,
    important: 2,
    normal: 3
  }

export default (issues, { text, sortBy }, status, date) => 
  issues.filter(issue => {            
    //const createdAtMoment = moment(issue.createdAt);
    const nowMoment = moment(new Date());
    //const duration = moment.duration(nowMoment.diff(createdAtMoment)).asDays();
        
    let dateFilter = true;
    if(date) {      
      let issueDateToFilter = moment(issue.createdAt);
      if(status) {
        if(status === 'close') {
          issueDateToFilter = moment(issue.updatedAt);
        }
      }
      
      const duration = moment.duration(nowMoment.diff(issueDateToFilter)).asDays();      
      dateFilter = date === 'new' ? (duration <= 7) : (duration > 7)
    }

    const statusFilter = status ? issue.status === status : true;
    const textFilter = issue.title.toLowerCase().includes(text.toLowerCase().trim());
  
    return dateFilter && statusFilter && textFilter;    

  }).sort((a, b) => sortBy === 'createdAt' ? compareByDate(a[sortBy], b[sortBy]) : compareByPriority(a[sortBy], b[sortBy], priorities));






  // (!status) 
  //  ? issues.filter(issue => issue.title.toLowerCase().includes(text.toLowerCase().trim()))
  //   .sort((a, b) => sortBy === 'createdAt' ? compareByDate(a[sortBy], b[sortBy]) : compareByPriority(a[sortBy], b[sortBy], priorities)) 
  //  : issues.filter(issue => issue.status === status);

  
    