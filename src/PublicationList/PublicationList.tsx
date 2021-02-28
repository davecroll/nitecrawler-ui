import {
  DetailsList,
  IColumn,
  SelectionMode,
  TooltipHost,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import {
  IPublication,
  publicationManager,
} from "../services/PublicationManager";

export const PublicationList: React.FC = () => {
  const [publications, setPublications] = useState<IPublication[]>([]);

  useEffect(() => {
    publicationManager.getPublications().then((pubs) => {
      setPublications(pubs);
    });
  }, []);

  const iconStyles = {
    verticalAlign: "middle",
    maxHeight: "16px",
    maxWidth: "16px",
  };

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Icon",
      minWidth: 30,
      onRender: (item: IPublication) => (
        <TooltipHost content="pdf file">
          <img
            src="https://static2.sharepointonline.com/files/fabric/assets/item-types/16/pdf.svg"
            alt="pdf file icon"
            style={iconStyles}
          />
        </TooltipHost>
      ),
    },
    { key: "column2", name: "Name", fieldName: "name", minWidth: 100 },
    { key: "column3", name: "Sector", fieldName: "sector", minWidth: 100 },
    {
      key: "column4",
      name: "SubSector",
      fieldName: "subSector",
      minWidth: 100,
    },
  ];

  return (
    <DetailsList
      items={publications}
      columns={columns}
      selectionMode={SelectionMode.none}
    />
  );
};
