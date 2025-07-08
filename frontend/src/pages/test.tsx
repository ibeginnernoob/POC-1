
import FileSelector from "@/components/snag/fileSelector";

export default function Test() {
  const files = [
	{
	  id: "1",
	  name: "Document.pdf",
	  size: 102400,
	  type: "application/pdf",
	  uploadDate: new Date(),
	},
	{
	  id: "2",
	  name: "Image.png",
	  size: 204800,
	  type: "image/png",
	  uploadDate: new Date(),
	},
  ];

  const handleFileSelect = (fileId: string | null) => {
	console.log("Selected file ID:", fileId);
  };

  return (
	<div className="p-4">
	  <FileSelector
		files={files}
		selectedFile={null}
		onFileSelect={handleFileSelect}
		placeholder="Select a file to query..."
	  />
	</div>
  );
}