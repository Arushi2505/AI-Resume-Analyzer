import pdfplumber
from docx import Document


def extract_text(file):
    filename = file.filename.lower()

    if filename.endswith(".pdf"):
        return extract_pdf(file)

    elif filename.endswith(".docx"):
        return extract_docx(file)

    return ""


def extract_pdf(file):
    text = ""

    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text


def extract_docx(file):
    document = Document(file.file)

    text = "\n".join(
        para.text
        for para in document.paragraphs
    )

    return text