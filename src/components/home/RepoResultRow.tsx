export default function RepoResultRow(props: { name: string; id: number }) {
  return <div key={props.id}>{props.name}</div>;
}
