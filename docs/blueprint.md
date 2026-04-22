# **App Name**: SheetFlow Entry

## Core Features:

- Data Input Form: A user-friendly interface to enter contact details, location (Wakiso), cell number, age (HM/MH), and date. The date field will pre-fill with the current date.
- Google Sheet Lookup: Utilizes the provided Google Sheet link to check if a person, identified by their cell number, already exists in the system before attempting to add new data.
- Google Sheet Entry Addition: Seamlessly append new, unique entry data (Contact, Location, Cell Number, Age, Date) as a new row to the specified Google Sheet upon successful submission.
- Duplicate Entry Feedback: If a person is found to be already in the system, display an immediate message indicating this, along with their existing Contact, Location, Cell Number, Age, and Date from the Google Sheet.
- New Entry Confirmation: Provide a clear success message to the operator after a new person's details have been successfully added to the Google Sheet.
- AI-Powered Entry Status Communicator Tool: Leverage an LLM tool to generate clear, concise, and context-aware status messages for the operator, whether an entry is new, updated, or a duplicate, assisting in quick interpretation and next steps based on the data fields.

## Style Guidelines:

- Primary action color: A clear, professional blue (#269DD9), symbolizing reliability and clarity in data handling.
- Background color: A very subtle, cool-toned light grey-blue (#F0F2F4), providing a clean and non-distracting canvas for information display.
- Accent color: A vibrant, fresh greenish-yellow (#CFEA47) for highlights, status indicators, and important alerts, drawing attention effectively.
- Main font for all text: 'Inter' (sans-serif), chosen for its exceptional readability, modern appearance, and neutrality, ensuring clear data presentation.
- Utilize minimalist line icons that clearly convey actions and status, such as checkmarks for success, warning symbols for duplicates, and user avatars for entries, maintaining a consistent, clean aesthetic.
- A clean and organized layout featuring clear section divisions, ample whitespace around input fields and data displays, and a responsive design to ensure usability across devices.
- Subtle, non-intrusive animations for form transitions and feedback messages, such as fade-ins for success/error alerts and gentle highlighting on focus, enhancing user experience without distraction.