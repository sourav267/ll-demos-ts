import CarType from "../enums/carType";

class SearchCriteria {
  location?: string;
  startDate?: Date;
  endDate?: Date;
  carType?: CarType;
  minPrice?: number;
  maxPrice?: number;

  constructor(
    location?: string,
    startDate?: Date,
    endDate?: Date,
    carType?: CarType,
    minPrice?: number,
    maxPrice?: number
  ) {
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.carType = carType;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
  }
}

export default SearchCriteria;