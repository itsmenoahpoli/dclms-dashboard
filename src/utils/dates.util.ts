import moment from "moment";

export const datesUtils = {
  formatDate: function (date: string, format: string = "MMM D, YYYY   h:m A") {
    return moment(date).format(format);
  },
};
