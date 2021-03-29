import {
  DetailsList,
  IColumn,
  SelectionMode,
  TooltipHost,
} from "@fluentui/react";
import { useEffect, useState } from "react";
import { useAuthContext } from "../AuthProvider/AuthProvider";
import {
  IPublication,
  publicationManager,
} from "../services/PublicationManager";

export const PublicationList: React.FC = () => {
  const [publications, setPublications] = useState<IPublication[]>([]);
  const { getToken } = useAuthContext();

  useEffect(() => {
    const func = async () => {
      let token;

      if (getToken) {
        token = await getToken();
      }

      const publications = await publicationManager.getPublications(
        token || undefined
      );

      setPublications(publications);
    };

    func();
  }, [getToken]);

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
      name: "Subsector",
      fieldName: "subsector",
      minWidth: 100,
    },
    {
      key: "column4",
      name: "Access",
      minWidth: 50,
      onRender: (item: IPublication) => (
        <>{item.canUserAccess == null ? "???" : String(item.canUserAccess)}</>
      ),
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
