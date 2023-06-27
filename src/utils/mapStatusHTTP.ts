export default function mapStatusHTTP(type: string): number {
  const statusHTTPMap: Record<string, number> = {
    INVALID_DATA: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SUCCESSFUL_RETRIEVAL: 200,
    SUCCESSFUL_CREATION: 201,
  };
  
  return statusHTTPMap[type];
}