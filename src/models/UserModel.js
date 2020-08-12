export default class UserModel {
    constructor({ name, email, password, isCommitteeMember, apartment, committee, tenants = [], createdAt, updatedAt }) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isCommitteeMember = isCommitteeMember;
        this.apartment = apartment;
        this.committee = committee;
        this.tenants = tenants;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}