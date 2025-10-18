interface Props {
  params: { id: string };
}

export default function ProjectDetail({ params }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Project {params.id}</h1>
      <p className="text-gray-600">Detailed info about this project...</p>
    </div>
  );
}
