import React, { useState } from 'react';
import { xata } from '../lib/xata';

const EditPage = ({ resumeRecord }) => {
  const [showForm, setShowForm] = useState(false);
  const [resume, setResume] = useState(resumeRecord);
  const handleEditClick = () => {
    setShowForm(!showForm);
  }
  const handleSaveClick = (e) => {
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
    // setResume({ ...resume });
    // todo: if this fails, figure out how to show
    xata.db.resumes.update(resumeRecord.id, { content: newContent });

    setShowForm(!showForm);
  }


  return (
    <>
      {showForm && (
        <form onSubmit={handleSaveClick}>
          <textarea name="markdownContent" rows="30" cols="40" defaultValue={resume.content}></textarea>
          <button type="submit">Save</button>
        </form>
      )}
      {!showForm && <button onClick={handleEditClick}>Edit</button>}
    </>
  );
};

export { EditPage };
