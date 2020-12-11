export const formatJobFromAPI = (job, additionalFields) => {
  // github data
  // company: "Defendify"
  // company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBblNOIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--a2730d55401adcd2e1832cebe43cc72f28ecbf83/Defendify_grey_R.png"
  // company_url: "https://www.defendify.io/"
  // created_at: "Fri Oct 30 15:33:27 UTC 2020"
  // description: "<p>Thanks for your interest in working with us! Defendify is a fast-growing, fun-loving cybersecurity startup with a small, vibrant team based in Portland, Maine. Resourcefulness, responsiveness, problem-solving, and simplicity are values that shape who we are, what we do, and how we deliver amazing customer experiences.</p>↵<p><strong>Position Details</strong></p>↵<p>We're looking for a senior level full stack developer to join us full-time, locally and/or in a remote capacity. This is a unique and exciting opportunity as we continue to expand the footprint of our groundbreaking, all-in-one cybersecurity platform. Every team member is a valuable contributor to our core SaaS product with day-to-day responsibilities covering a variety of development needs including building, maintaining, QA, and support for every aspect of the Defendify platform.</p>↵<p><strong>We are looking for a team player who:</strong></p>↵<ul>↵<li>Has a passion for solving problems and is eager to grow, learn, and tackle daily and long-term challenges and goals.</li>↵<li>Will dig in and ask questions from users to understand requirements; make a plan; dive into an existing codebase and learn where to make changes, or where to start new code.</li>↵<li>Is a good communicator who enjoys collaboration and thrives in a development culture that values clean code, automation and testability.</li>↵<li>Maintains excellent knowledge of how modern web applications work, including REST API usage, application security, cloud deployment and development best practices.</li>↵<li>Is comfortable self-directing their own work. No micro-management here!</li>↵</ul>↵<p><strong>Requirements – Experience</strong></p>↵<ul>↵<li>5+ years of Full-Stack Development experience</li>↵<li>Has been responsible for the entire lifecycle of code in at least one project, from scratch to QA to deployment to maintenance.</li>↵<li>Has experience implementing a RESTful API and an application which consumes it.</li>↵<li>Is familiar with the philosophy and implementation of development automation: tests, continuous integration, cloud deployment, and frequent production releases using an Agile/SCRUM process.</li>↵<li>DevOps experience is a plus.</li>↵</ul>↵<p><strong>Requirements – Technical</strong></p>↵<ul>↵<li>Experienced in JavaScript including ES6, await/async, linting and front-end frameworks. We use libraries and frameworks as needed, but you need to be able to write and understand plain JS.</li>↵<li>Experience with Node and Browser based environments is required.</li>↵<li>Understand REST APIs and their role in application architectures.</li>↵<li>Experience with front end development: HTML, CSS, and familiarity with the ecosystem of related technologies (SASS, DOM). In addition, Vue (or similar framework) experience and knowledge of static site generators such as Jekyll/Hugo are helpful.</li>↵<li>Understand how to use Git(+Hub) and GitHub Flow.</li>↵<li>Some relational database experience is needed. Pluses include: Experiences in relational and in-memory databases (MySQL, Postgres, Redis) as well as knowledge in generic SQL.</li>↵<li>Some experience with Amazon Web Services (AWS), Heroku, or similar services.</li>↵</ul>↵<p><strong>Your Success</strong></p>↵<p>You are not alone in your role – Defendify's development team is made up of "A" players dedicated to your training and success. We thrive on an open-door policy and transparent management system that fosters team collaboration.</p>↵<p><strong>Compensation and Benefits</strong></p>↵<p>This is a flexible position open to candidates with varying levels of experience and offers long term growth potential via a well-defined career path. Compensation is competitive and commensurate with experience, and is variable based on personal and team performance. Our benefits package is comprehensive and includes health, dental, and vision coverage, educational reimbursement, a 401(k) program, paid time-off and more.</p>↵<p><strong>Love What You Do</strong></p>↵<p>Defendify employees enjoy a modern work environment and culture where everyone genuinely cares about the work they do. We're passionate about our product, the problems we're solving, our customers, our partners, and our team. We're in it together, enjoying work and play every day from team lunches, impromptu social outings and celebrations, and charity missions. And yes, there is coffee, lots and lots of coffee!</p>↵<p><strong>Opportunity Knocks</strong></p>↵<p>This position offers a great opportunity to make an impact as a part of a small team solving big problems, making cybersecurity possible for Small Business. Are you a creative self-starter with an appetite to learn and grow? If so, we'd love to hear from you!</p>↵"
  // how_to_apply: "<p>Apply now at <a href="https://defendify.breezy.hr/p/267bbae0c690-senior-full-stack-developer">https://defendify.breezy.hr/p/267bbae0c690-senior-full-stack-developer</a></p>↵"
  // id: "912fc53b-1b7f-427a-bc69-25f03b597f8c"
  // location: "Portland, ME (Remote OK)"
  // title: "Senior Full Stack Developer"
  // type: "Full Time"
  // url:"https://jobs.github.com/positions/ff9219e4-6cb7-4e22-9beb-d660ef2edfb5"

  // feature API
  // company: {companyId: 1, name: "ABC", url: "abc.com", logo: "a1.jpg"}
  // createdAt: "2020-12-06T06:16:30.000+00:00"
  // description: "desc1"
  // extId: "912fc53b-1b7f-427a-bc69-25f03b597f8c"
  // jobId: 1
  // location: "Boston, MA"
  // recruiter: null
  // title: "Software Engineer"
  // type: "Full Time"
  const { company, ...restJob } = job;
  return {
    ...restJob,
    company: company ? company.name : "",
    company_logo: company ? company.logo : "",
    company_url: company ? company.url : "",
    company_id: company ? company.companyId : "",

    id: job.extId || "ext_Id",
    ...additionalFields,
  };
};

export const formatJobToAPI = (job) => {
  const {
    id,
    company,
    company_logo,
    company_url,
    company_id,
    ...restJob
  } = job;
  return {
    ...restJob,
    company: {
      name: company,
      logo: company_logo,
      url: company_url,
      companyId: company_id,
    },
    extId: id,
  };
};

export const setUserData = (user, propogator = () => {}) => {
  localStorage.setItem("username", user.username);
  localStorage.setItem("id", user.id);
  localStorage.setItem("type", user.type);
  propogator();
};

export const removeUserData = (propogator = () => {}) => {
  localStorage.removeItem("username");
  localStorage.removeItem("type");
  localStorage.removeItem("id");
  propogator();
};

export const getUserData = () => {
  return {
    username: localStorage.getItem("username"),
    id: localStorage.getItem("id"),
    type: localStorage.getItem("type"),
  };
};
