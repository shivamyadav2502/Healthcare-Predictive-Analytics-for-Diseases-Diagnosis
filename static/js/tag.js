const ul = document.querySelector("ul"),
  input = ul.querySelector("input");
count = document.querySelector(".details span");
rem = document.querySelector(".details button");
sbut = document.getElementById("submit");
let symp = [
  "itching",
  "skin_rash",
  "nodal_skin_eruptions",
  "continuous_sneezing",
  "shivering",
  "chills",
  "joint_pain",
  "stomach_pain",
  "acidity",
  "ulcers_on_tongue",
  "muscle_wasting",
  "vomiting",
  "burning_micturition",
  "spotting_urination",
  "fatigue",
  "weight_gain",
  "anxiety",
  "cold_hands_and_feets",
  "mood_swings",
  "weight_loss",
  "restlessness",
  "lethargy",
  "patches_in_throat",
  "irregular_sugar_level",
  "cough",
  "high_fever",
  "sunken_eyes",
  "breathlessness",
  "sweating",
  "dehydration",
  "indigestion",
  "headache",
  "yellowish_skin",
  "dark_urine",
  "nausea",
  "loss_of_appetite",
  "back_pain",
  "constipation",
  "abdominal_pain",
  "diarrhoea",
  "mild_fever",
  "yellow_urine",
  "yellowing_of_eyes",
  "acute_liver_failure",
  "fluid_overload",
  "swelling_of_stomach",
  "swelled_lymph_nodes",
  "malaise",
  "blurred_and_distorted_vision",
  "phlegm",
  "throat_irritation",
  "redness_of_eyes",
  "sinus_pressure",
  "runny_nose",
  "congestion",
  "chest_pain",
  "weakness_in_limbs",
  "fast_heart_rate",
  "pain_during_bowel_movements",
  "pain_in_anal_region",
  "bloody_stool",
  "irritation_in_anus",
  "neck_pain",
  "dizziness",
  "cramps",
  "bruising",
  "obesity",
  "swollen_legs",
  "swollen_blood_vessels",
  "puffy_face_and_eyes",
  "enlarged_thyroid",
  "brittle_nails",
  "swollen_extremeties",
  "excessive_hunger",
  "extra_marital_contacts",
  "drying_and_tingling_lips",
  "slurred_speech",
  "knee_pain",
  "hip_joint_pain",
  "muscle_weakness",
  "stiff_neck",
  "swelling_joints",
  "movement_stiffness",
  "spinning_movements",
  "loss_of_balance",
  "unsteadiness",
  "weakness_of_one_body_side",
  "loss_of_smell",
  "bladder_discomfort",
  "foul_smell_ofurine",
  "continuous_feel_of_urine",
  "passage_of_gases",
  "internal_itching",
  "toxic_look_(typhos)",
  "depression",
  "irritability",
  "muscle_pain",
  "altered_sensorium",
  "red_spots_over_body",
  "belly_pain",
  "abnormal_menstruation",
  "dischromic _patches",
  "watering_from_eyes",
  "increased_appetite",
  "polyuria",
  "family_history",
  "mucoid_sputum",
  "rusty_sputum",
  "lack_of_concentration",
  "visual_disturbances",
  "receiving_blood_transfusion",
  "receiving_unsterile_injections",
  "coma",
  "stomach_bleeding",
  "distention_of_abdomen",
  "history_of_alcohol_consumption",
  "fluid_overload",
  "blood_in_sputum",
  "prominent_veins_on_calf",
  "palpitations",
  "painful_walking",
  "pus_filled_pimples",
  "blackheads",
  "scurring",
  "skin_peeling",
  "silver_like_dusting",
  "small_dents_in_nails",
  "inflammatory_nails",
  "blister",
  "red_sore_around_nose",
  "yellow_crust_ooze",
  "prognosis",
];

let sym = symp.sort();

let tags = [];
let maxtag = 16;
let mintag=3;
countTag();
function countTag() {
  c = mintag - tags.length;
  count.innerHTML = c>0?c:0;
  if (tags.length < 3) {
    sbut.disabled = true;
  } else {
    sbut.disabled = false;
  }
}
function createTag() {
  ul.querySelectorAll("li").forEach((li) => li.remove());
  // console.log(tags.slice().reverse());
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this,'${tag}')"></i></li>`;
      ul.insertAdjacentHTML("afterbegin", liTag);
    });
}

function remove(elem, tag) {
  let index = tags.indexOf(tag);
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  elem.parentElement.remove();
  countTag();
  // console.log(tags);
}

function addTag(e) {
  removeList();
  for (let i of sym) {
    if (
      i.toLowerCase().includes(input.value.toLowerCase()) &&
      input.value != "" &&
      !tags.includes(i)
    ) {
      let listItem = document.createElement("li");
      listItem.classList.add("list-items");
      listItem.style.cursor = "pointer";
      listItem.setAttribute("onclick", "displayNames('" + i + "')");

      let word = "<b>" + i.substring(0, input.value.length) + "</b>";
      word += i.substring(input.value.length);
      // console.log(word);

      listItem.innerHTML = word;
      document.querySelector(".list").appendChild(listItem);
    }
  }
  if (e.key == "Enter") {
    let tag = e.target.value.replace(/\s+/g, " ");
    if (tags.length < maxtag) {
      if (tag.length > 1 && !tags.includes(tag) && sym.includes(tag)) {
        tag.split(",").forEach((tag) => {
          tags.push(tag);
          createTag();
          countTag();
        });
      }
    }
    e.target.value = "";
  }
}

function displayNames(value) {
  if (tags.length < maxtag) {
    if (value.length > 1 && !tags.includes(value)) {
      tags.push(value);
      createTag();
      countTag();
    }
  }
  removeList();
  input.value = "";
}

function removeList() {
  let itemss = document.querySelectorAll(".list-items");
  itemss.forEach((item) => item.remove());
}
input.addEventListener("keyup", addTag);

rem.addEventListener("click", () => {
  tags.length = 0;
  ul.querySelectorAll("li").forEach((li) => li.remove());
  countTag();
});

sbut.addEventListener("click", () => {
  var xhr = new XMLHttpRequest();
  var url = "/predict";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      localStorage.setItem("data", JSON.stringify(json));
      //   console.log(json);
      window.location.href = "/result";
    }
  };
  var jtag = { data: tags };
  console.log(jtag);
  var data = JSON.stringify(jtag);
  xhr.send(data);
});
