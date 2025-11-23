function fetchPostData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Post Data fetched");
    }, 2000);
  });
}

function fetchCommentData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Comment data fetched.");
    }, 3000);
  });
}

async function getBlogData() {
  try {
    console.log("Fetching blog data");
    // const postData = await fetchPostData();
    // const commentData = await fetchCommentData();
    const [postData, commentData] = await Promise.all([
      fetchPostData(),
      fetchCommentData(),
    ]);

    

    console.log(postData);
    console.log(commentData);

    console.log("fetch complete");
  } catch (error) {
    console.error("Error fetching blog data", error);
  }
}
// getBlogData();



function simulateAsyncTask() {
    return new Promise((resolve)=>{
        
       setTimeout(() => {
           resolve ( `Task finished`);
       }, 2000); 
    });
}

async function getAsyncTask(){
    try {
        console.log (`Task started`);
        let value = await simulateAsyncTask();
        // console.log (`Task finished`);
        console.log (value);
    } catch (e) {
        console.log(error);
    }
}

 getAsyncTask();




function Task1() {
    return new Promise ((resolve) => {
        setTimeout(() => {
           resolve ( `Task 1 finished`);
       }, 1000); 
    });
}
function Task2() {
    return new Promise ((resolve) => {
        setTimeout(() => {
           resolve ( `Task 2 finished`);
       }, 2000); 
    });
}
function Task3() {
    return new Promise ((resolve) => {
        setTimeout(() => {
           resolve ( `Task 3 finished`);
       }, 3000); 
    });
}

async function simulateMultipleTasks() {
    try {
        // const t1 = await Task1();
        // console.log(t1);
        // const t2 = await Task2();
        // console.log(t2);
        // const t3 = await Task3();
        // console.log(t3);

        const [t1,t2,t3] = await Promise.all([Task1(), Task2(), Task3()]);
        console.log(t1);
        console.log(t2);
        console.log(t3);
    } 
    catch (error) {
        console.log(error);
    }
    
}
simulateMultipleTasks();
