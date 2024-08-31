import { BlockRounded, PictureAsPdf } from "@mui/icons-material";
import { Link } from "@mui/material";
import { DocumentFragment } from "@portal/graphql";

export const FileLink = ({ document }: { document: DocumentFragment }) => {
  return (
    <>
      {document.defaultFile?.file?.url ? (
        <Link
          color={"primary.main"}
          href={document.defaultFile.file.url}
          target="_blank"
          sx={{
            display: "flex",
            alignItem: "center",
            justifyContent: "center",
            zIndex: 30,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <PictureAsPdf />
        </Link>
      ) : (
        <BlockRounded sx={{ opacity: 0.5 }} />
      )}
    </>
  );
};
