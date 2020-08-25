export default (tenants, { text }) => 
    tenants.filter(item => item.name.toLowerCase().includes(text.toLowerCase().trim()));
    