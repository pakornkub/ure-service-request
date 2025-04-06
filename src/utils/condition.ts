type StatusType = number | string;

const isStatusAllowed = (allowedStatuses: StatusType[], currentStatus: StatusType | StatusType[]): boolean => {
  if (Array.isArray(currentStatus)) {
    return currentStatus.some((status) => allowedStatuses.includes(status));
  } else {
    return allowedStatuses.includes(currentStatus);
  }
};

const isStatusForbidden = (forbiddenStatuses: StatusType[], currentStatus: StatusType | StatusType[]): boolean => {
  if (Array.isArray(currentStatus)) {
    return !currentStatus.some((status) => forbiddenStatuses.includes(status));
  } else {
    return !forbiddenStatuses.includes(currentStatus);
  }
};

export const checkStatusCondition = (statusList: StatusType[], currentStatus: StatusType | StatusType[], isAllowList: boolean): boolean => {
  return isAllowList ? isStatusAllowed(statusList, currentStatus) : isStatusForbidden(statusList, currentStatus);
};
