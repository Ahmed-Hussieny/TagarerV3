
import { useParams } from 'react-router-dom';
import PDFViewer from '../../components/Custom/PDFViewer';
import { Helmet } from 'react-helmet-async';

export default function ShowPDF() {
    const { pdfName, name, kind, details } = useParams();
    return (
        <>
            <Helmet>
                <title> {name} </title>
                <meta name="description" content={details} />
            </Helmet>
            <PDFViewer
                pdfUrl={`${import.meta.env.VITE_SERVER_URL_WS_RECONNECT}/uploads/Original_PDFs/${kind}/${pdfName}`}
            />
        </>
    )
}
