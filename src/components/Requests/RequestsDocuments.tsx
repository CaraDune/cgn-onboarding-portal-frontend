import React, { useState, useEffect, useRef } from "react";
import { Button, Icon } from "design-react-kit";
import { tryCatch } from "fp-ts/lib/TaskEither";
import { toError } from "fp-ts/lib/Either";
import DocumentIcon from "../../assets/icons/document.svg";
import DocumentSuccess from "../../assets/icons/document-success.svg";
import CenteredLoading from "../CenteredLoading";
import Api from "../../api/backoffice";
import {
  Agreement,
  Document,
  DocumentType
} from "../../api/generated_backoffice";

const CheckedDocument = ({
  doc,
  i,
  deleteDocument
}: {
  doc: Document;
  i: number;
  deleteDocument: (type: DocumentType) => void;
}) => {
  const label =
    doc.documentType === "Agreement"
      ? "Convenzione"
      : "Manifestazione di interesse";
  return (
    <div key={i} className="border-bottom py-5">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <div className="mb-3 text-gray">{label}</div>
          <div className="d-flex flex-row align-items-center">
            <DocumentSuccess className="mr-4" />
            <a href={doc.documentUrl} target="_blank" rel="noreferrer">
              {label.replace(" ", "_")}.pdf
            </a>
          </div>
        </div>

        <span
          className="d-flex flex-row align-items-center cursor-pointer"
          onClick={() => deleteDocument(doc.documentType)}
        >
          <Icon icon="it-delete" size="sm" color="primary" />
          <span className="text-sm text-blue">Elimina</span>
        </span>
      </div>
    </div>
  );
};

const UncheckedDocument = ({
  doc,
  i,
  original,
  uploadDocument
}: {
  doc: Document;
  i: number;
  original: Agreement;
  uploadDocument: (type: DocumentType, file: File) => void;
}) => {
  const uploadInputRef = useRef<any>(null);
  const label =
    doc.documentType === "Agreement"
      ? "Convenzione"
      : "Manifestazione di interesse";
  return (
    <div key={i} className="border-bottom py-5">
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div>
          <div className="mb-3 text-gray">{label}</div>
          <div className="d-flex flex-row align-items-center">
            <DocumentIcon className="mr-4" />
            <a href={doc.documentUrl} target="_blank" rel="noreferrer">
              {label.replace(" ", "_")}.pdf
            </a>
          </div>
        </div>
        <Button
          color="primary"
          icon
          size="sm"
          tag="button"
          disabled={original.state === "PendingAgreement"}
          onClick={() => uploadInputRef.current?.click()}
        >
          <Icon
            color="white"
            icon="it-upload"
            padding={false}
            size="xs"
            className="mr-2"
          />
          Carica controfirmato
        </Button>
        <input
          type="file"
          style={{ display: "none" }}
          ref={uploadInputRef}
          accept="application/pdf"
          onChange={e => {
            if (e.target.files?.length) {
              uploadDocument(doc.documentType, e.target.files[0]);
            }
          }}
        />
      </div>
    </div>
  );
};

const RequestsDetails = ({
  original,
  setCheckAllDocs
}: {
  original: Agreement;
  setCheckAllDocs: (state: boolean) => void;
}) => {
  const [documents, setDocuments] = useState<Array<Document>>();
  const [loading, setLoading] = useState(false);

  const getDocumentsApi = async () =>
    await tryCatch(() => Api.Document.getDocuments(original.id), toError)
      .map(response => response.data)
      .fold(
        () => setLoading(false),
        response => {
          setLoading(false);
          setDocuments(response);
        }
      )
      .run();

  const getDocuments = () => {
    if (!loading) {
      setLoading(true);
    }
    void getDocumentsApi();
  };

  const uploadDocumentApi = async (documentType: DocumentType, file: File) =>
    await tryCatch(
      () => Api.Document.uploadDocument(original.id, documentType, file),
      toError
    )
      .map(response => response.data)
      .fold(
        () => setLoading(false),
        () => {
          getDocuments();
          setLoading(false);
        }
      )
      .run();

  const uploadDocument = (documentType: DocumentType, file: File) => {
    setLoading(true);
    void uploadDocumentApi(documentType, file);
  };

  const deleteDocumentApi = async (documentType: DocumentType) =>
    await tryCatch(
      () => Api.Document.deleteDocument(original.id, documentType),
      toError
    )
      .map(response => response.data)
      .fold(
        () => setLoading(false),
        () => {
          setLoading(false);
          getDocuments();
        }
      )
      .run();

  const deleteDocument = async (documentType: DocumentType) => {
    setLoading(true);
    void deleteDocumentApi(documentType);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  useEffect(() => {
    setCheckAllDocs(documents?.length === 2);
  }, [documents]);

  return (
    <>
      <h1 className="h5 font-weight-bold text-dark-blue mb-5">Documenti</h1>
      {loading ? (
        <CenteredLoading />
      ) : (
        original.documents?.map((doc, i) => {
          const uploadedDoc = documents?.find(
            d => d.documentType === doc.documentType
          );
          if (!uploadedDoc) {
            return (
              <UncheckedDocument
                key={i}
                doc={doc}
                i={i}
                original={original}
                uploadDocument={uploadDocument}
              />
            );
          } else {
            return (
              <CheckedDocument
                key={i}
                doc={doc}
                i={i}
                deleteDocument={deleteDocument}
              />
            );
          }
        })
      )}
    </>
  );
};

export default RequestsDetails;
