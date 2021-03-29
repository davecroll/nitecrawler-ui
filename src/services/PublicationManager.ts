class PublicationManager {
  getPublications = async (token?: string): Promise<IPublication[]> => {
    const requestInit: RequestInit = {};
    if (!!token) {
      requestInit.headers = {
        'Authorization': token
      }
    }

    const response = await fetch('https://nitecrawler-api.azurewebsites.net/publications', requestInit);
    const json = await response.json();
    const data = json.data;
    
    const publications: IPublication[] = [];
    for (const item of data) {
      const publication = {
        publicationId: item.id,
        name: item.name,
        sector: item.sector,
        subsector: item.subsector,
        URI: item.URI,
        canUserAccess: item.canUserAccess
      }

      publications.push(publication);
    }

    return publications;
  }
}

export const publicationManager = new PublicationManager();

export interface IPublication {
  publicationId: number;
  name: string;
  sector: string;
  subsector: string;
  URI: string;
  canUserAccess?: boolean;
}