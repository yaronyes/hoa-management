export default class UserModel {
    constructor({ _id, name, email, password, isCommitteeMember, apartment, committee, tenants = [], createdAt, updatedAt, cardMode = false }) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.isCommitteeMember = isCommitteeMember;
        this.apartment = apartment;
        this.committee = committee;
        this.tenants = tenants;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.cardMode = cardMode;
    }
}