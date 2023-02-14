import React, { useState } from 'react';
import type { ResumesRecord } from '../lib/xata.codegen';

const EditPage = ({ resumeRecord }: { resumeRecord: ResumesRecord }) => {
  const [showForm, setShowForm] = useState(false);
  const [resume, setResume] = useState(resumeRecord);
  const handleEditClick = () => {
    setShowForm(!showForm);
  }
  const handleSaveClick = (e: React.FormEvent<HTMLFormElement>) => {
    // call database with updated value for this record
    e.preventDefault();

    // Read the form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    const newContent = formJson.markdownContent;
    // update immediately, then do the db call
    // resume.update({ content: newContent });
    setResume({ ...resume, content: newContent.toString() });
    // todo: if this fails, figure out how to show

    fetch("/update-resume", {
      method: "POST",
      body: JSON.stringify({ ...resume, content: newContent }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((response) => response.json())
      .then((updateResponse) => {
        console.log(updateResponse);
      })

    setShowForm(!showForm);
  }


  return (
    <>
      {showForm && (
        <form onSubmit={handleSaveClick}>
          <textarea name="markdownContent"
            rows={30}
            cols={40}
            defaultValue={resume.content}></textarea>
          <button type="submit">Save</button>
        </form>
      )
      }
      {!showForm && <button onClick={handleEditClick}>Edit</button>}
    </>
  );
};

export { EditPage };
