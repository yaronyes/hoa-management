export default class CommitteeModel {
    constructor({ _id, createdBy, buildingCommunityName, address, city, createdAt, updatedAt }) {
        this._id = _id;
        this.createdBy = createdBy;
        this.buildingCommunityName = buildingCommunityName;
        this.address = address;
        this.city = city;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}