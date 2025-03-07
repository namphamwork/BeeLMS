import React, { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CurriculumData } from '../../types/Curiculum';
import { VITE_ASSET_URL } from '../../layout/Header/Header';

interface MultipleFileProps {
    onFileData: (fileData: File[]) => void;
    curriculumData?: CurriculumData[];
}

const MultipleFileEdit: React.FC<MultipleFileProps> = ({ onFileData, curriculumData = [] }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    useEffect(() => {
        // Chuyển đổi curriculumData thành mảng File trước khi set
        const convertedFiles: File[] = curriculumData.map((curriculum) => {
            // Tạo một đối tượng File giả mạo để đáp ứng yêu cầu kiểu dữ liệu của selectedFiles
            const file = new File([], curriculum.originalname, { type: curriculum.type });
    
            // Thêm các thuộc tính khác vào đối tượng File
            Object.defineProperty(file, 'size', {
                value: Number(curriculum.size),
                writable: true,
            });    
            return file;
        });
    
        setSelectedFiles(convertedFiles);
    }, [curriculumData]);
    const filesizes = (bytes: number, decimals = 2): number => {
        if (bytes === 0) return 0;
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    };

    const validateFileType = (fileType: string): boolean => {
        const allowedFileTypes = [
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/x-zip-compressed',
        ];

        return allowedFileTypes.includes(fileType);
    };

    const getIconFile = (fileType: string): string => {
        switch (fileType) {
            case 'application/pdf':
                return 'pdf.png';
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return 'doc.png';
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return 'ppt.png';
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return 'xls.png';
            case 'application/x-zip-compressed':
                return 'zip.png';
            default:
                return '';
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        if (files) {
            const updatedFiles: File[] = Array.from(files);

            const invalidFiles = updatedFiles.filter((file) => {
                const fileType = file.type;
                return !validateFileType(fileType);
            });

            if (invalidFiles.length > 0) {
                toast.warn('Invalid file types! Only PDF, Word, Excel, PowerPoint, and ZIP files are allowed.');
            } else {
                setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...updatedFiles]);
            }
        }
    };

    const deleteFile = (fileIndex: number): void => {
        setSelectedFiles((prevSelectedFiles) => {
            return prevSelectedFiles.filter((_, index) => index !== fileIndex);
        });

    };
    useEffect(() => {
        onFileData(selectedFiles);
    }, [selectedFiles, onFileData]);
    


    return (
        <div className="fileupload-view">

            <div className="row justify-content-center m-0">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="">
                            <div className="kb-data-box">
                                <div className="kb-modal-data-title">
                                    <div className="kb-data-title">
                                        <h1 className='text-2xl font-semibold leading-7 text-gray-900'>Upload học liệu (PDF, DOCX, CSV, PPTX)</h1>
                                    </div>
                                </div>
                                <form className='grid grid-cols-2 gap-2'>
                                    <div className="file-upload-box h-full">
                                        <input
                                            type="file"
                                            id="fileupload"
                                            className="file-upload-input"
                                            onChange={handleInputChange}
                                            multiple
                                            accept=".docx, .pdf, .csv, .pptx"
                                        />
                                        <span>Drag and drop or <span className="file-link">Choose your files</span></span>
                                    </div>
                                    <div className="kb-attach-box mb-3 w-full">
                                        {selectedFiles.length > 0 ? (
                                            selectedFiles.map((data, index) => (
                                                <div className="file-atc-box" key={index}>
                                                    <div className="file-image"> <img src={`${VITE_ASSET_URL}/${getIconFile(data.type)}`} alt="" /></div>
                                                    <div className="file-detail">
                                                        <h6>{data.name}</h6>
                                                        <p><span>Size : {filesizes(data.size)} KB</span></p>
                                                        <div className="file-actions">
                                                            <button type="button" onClick={() => { deleteFile(index) }} className="file-action-btn">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="file-atc-box">
                                                <div className="file-image"> <img src={`${VITE_ASSET_URL}/forbidden.png`} alt="" /></div>
                                                <div className="file-detail">
                                                    <h6>No File Select</h6>
                                                    <p><span>Size :  KB</span></p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultipleFileEdit;
