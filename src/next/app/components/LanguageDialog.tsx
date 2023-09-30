import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import exp from "constants";
import Link from "next/link";

export default function LanguageDialog() {
  return (
    <Dialog open>
      <DialogTitle>Choose Language</DialogTitle>
      <List>
        <ListItem>
          <Link href="es">Espanol</Link>
        </ListItem>
        <ListItem>
          <Link href="it">Italiano</Link>
        </ListItem>
      </List>
    </Dialog>
  );
}
