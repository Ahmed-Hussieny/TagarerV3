import React, { useState, useEffect } from 'react';
import { Worker, Viewer, ScrollMode, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { FaArrowCircleLeft } from 'react-icons/fa';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { useNavigate } from 'react-router-dom';

const PdfViewer: React.FC<{ pdfUrl?: string }> = ({ pdfUrl = '' }) => {
    const [loadingProgress, setLoadingProgress] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pdfData, setPdfData] = useState<Uint8Array | null>(null);
    const [error, setError] = useState<string | null>(null);

    const zoomPluginInstance = zoomPlugin();
    const toolbarPluginInstance = toolbarPlugin();
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;
    const { Toolbar } = toolbarPluginInstance;

    const navigate = useNavigate();

    // Fetch PDF with progress tracking
    useEffect(() => {
        if (!pdfUrl) return;

        const fetchPdf = async () => {
            try {
                setIsLoading(true);
                setLoadingProgress(0);
                setError(null);

                const response = await fetch(pdfUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch PDF: ${response.statusText}`);
                }

                const contentLength = response.headers.get('content-length');
                if (!contentLength) {
                    throw new Error("Cannot determine content length.");
                }

                const totalSize = parseInt(contentLength, 10);
                const reader = response.body?.getReader();
                if (!reader) {
                    throw new Error("No reader available.");
                }

                let receivedLength = 0;
                const chunks: Uint8Array[] = [];

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    chunks.push(value);
                    receivedLength += value.length;

                    // Calculate progress and update state
                    const progress = Math.round((receivedLength / totalSize) * 100);
                    setLoadingProgress(progress);
                }

                // Combine chunks into a single Uint8Array
                const pdfBlob = new Uint8Array(receivedLength);
                let position = 0;
                for (const chunk of chunks) {
                    pdfBlob.set(chunk, position);
                    position += chunk.length;
                }

                setPdfData(pdfBlob);
            } catch (error) {
                console.error("Error loading PDF:", error);
                setError("Failed to load PDF. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchPdf();
    }, [pdfUrl]);

    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Toolbar */}
            <div
                style={{
                    backgroundColor: '#f4f4f4',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Toolbar>
                    {(props: ToolbarSlot) => {
                        const {
                            CurrentPageInput: ToolbarCurrentPageInput,
                            EnterFullScreen,
                            GoToNextPage,
                            GoToPreviousPage,
                            NumberOfPages: ToolbarNumberOfPages,
                            ShowSearchPopover,
                        } = props;
                        return (
                            <>
                                <div style={{ width:"100%", display: 'flex', alignItems: 'center', gap: '1px' }}>
                                    <FaArrowCircleLeft className='text-main_color cursor-pointer' onClick={() => navigate(-1)} />
                                    <ShowSearchPopover />
                                    <GoToPreviousPage />
                                    <ToolbarCurrentPageInput />
                                    <span>/</span>
                                    <ToolbarNumberOfPages />
                                    <GoToNextPage />
                                    <ZoomOutButton />
                                    <ZoomPopover />
                                    <ZoomInButton />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <EnterFullScreen />
                                </div>
                            </>
                        );
                    }}
                </Toolbar>
            </div>

            {/* PDF Viewer */}
            <div
                style={{
                    flex: 1,
                    overflow: 'auto',
                    position: 'relative',
                    maxWidth: '100%',
                }}
            >
                {isLoading && (
                    
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        width: '300px',
                    }}
                    className='text-main_color'>{loadingProgress}%</div>
                )}
                {error && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            textAlign: 'center',
                            color: 'red',
                            zIndex: 10,
                            fontSize: '18px',
                        }}
                    >
                        {error}
                    </div>
                )}
                {pdfData && (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer
                            fileUrl={URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))}
                            plugins={[zoomPluginInstance, toolbarPluginInstance, pageNavigationPluginInstance]}
                            defaultScale={SpecialZoomLevel.PageFit}
                            scrollMode={ScrollMode.Vertical}
                        />
                    </Worker>
                )}
            </div>
        </div>
    );
};

export default PdfViewer;