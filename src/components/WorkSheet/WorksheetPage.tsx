import { useParams } from 'react-router-dom';
import WorksheetGallery from './WorksheetGallery';

function WorksheetPage() {
  const { categoryId } = useParams<{ categoryId?: string }>(); // מוודאים שזו מחרוזת
  
  // ממירים למספר עם ברירת מחדל
  const validCategoryId = categoryId || "1";

  return (
    <div>
      <WorksheetGallery categoryId={validCategoryId} />
    </div>
  );
}

export default WorksheetPage;
