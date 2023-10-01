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
        <ListItem>
          <Link href="fr">Frances</Link>
        </ListItem>
      </List>
      <div className="mt-8">
        <form className="flex flex-col gap-2 border-2">
          <input
            type="text"
            name="username"
            placeholder="enter username"
          ></input>
          <input
            type="password"
            name="password"
            placeholder="enter password"
          ></input>
        </form>
      </div>
    </Dialog>
  );
}
