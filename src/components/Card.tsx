interface Props {
  title: string;
  value: string;
}

function Card({ title, value }: Props) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default Card;