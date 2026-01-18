import { client } from '@/sanity/client';
import ArchiveDetailClient from './ArchiveDetailClient';

export async function generateStaticParams() {
    const query = `*[_type == "exhibition"]{ "_id": _id }`;
    const exhibitions = await client.fetch(query);
  
    return exhibitions.map((exb) => ({
      id: exb._id,
    }));
}

export default async function Page({ params }) {
    const { id } = await params;
    
    return <ArchiveDetailClient id={id} />;
}
