import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { textToVector } from "@/app/utils/textToVector";

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY!,
});

export async function POST(request: Request) {
  const { product, ailments, allergies, ingredients } = await request.json();

  if (!product || !ailments || !allergies || !ingredients) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Generate vector from page text
    const vector = await textToVector(ailments);

    // Store in Pinecone
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);
    await index.upsert([
      {
        id: `${product}`,
        values: vector,
        metadata: { ailments, allergies, ingredients },
      },
    ]);

    return NextResponse.json(
      { message: "Successfully uploaded and stored the vector" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing upload:", error);
    return NextResponse.json(
      { message: "Error processing upload" },
      { status: 500 }
    );
  }
}
