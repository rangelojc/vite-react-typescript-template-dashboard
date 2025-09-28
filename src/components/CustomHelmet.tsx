import config from "@/app.json";
import { Helmet } from "react-helmet";

export default function CustomHelmet(props: { title: string }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        {props.title} | {config["default-title"]}
      </title>
      <link rel="canonical" href={config["default-canonical-link"]} />
    </Helmet>
  );
}
