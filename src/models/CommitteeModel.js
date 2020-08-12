export default class CommitteeModel {
    constructor({ createdBy, buildingCommunityName, address, city, createdAt, updatedAt }) {
        this.createdBy = createdBy;
        this.buildingCommunityName = buildingCommunityName;
        this.address = address;
        this.city = city;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}