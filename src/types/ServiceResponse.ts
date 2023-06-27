export type ErrorType = 'UNAUTHORIZED' | 'NOT_FOUND' | 'INVALID_DATA'; 

export type FailedResponse = {
  status: ErrorType,
  data: {
    message: string
  }
};

export type SuccessfulResponse<Data> = {
  status: 'SUCCESSFUL_CREATION' | 'SUCCESSFUL_RETRIEVAL'
  data: Data;    
};

export type ServiceResponse<T> = SuccessfulResponse<T> | FailedResponse;