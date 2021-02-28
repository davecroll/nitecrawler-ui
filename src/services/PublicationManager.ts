class PublicationManager {
  getPublications = async (): Promise<IPublication[]> => {
    const response = await fetch('https://nitecrawler-api.azurewebsites.net/publications');
    const json = await response.json();
    const data = json.data;
    
    const publications: IPublication[] = [];
    for (const item of data) {
      const publication = {
        publicationId: item.PublicationId,
        name: item.Name,
        sector: item.Sector,
        subSector: item.SubSector,
        URI: item.URI
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
  subSector: string;
  URI: string;
}