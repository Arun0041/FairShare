# Bugs found

Add one section per issue. Bug 1 is filled in to show the format — fix it, then write what you changed. Copy the blank template for the rest.

Keep this file in the repo and **commit it** with your fixes.

---

## Bug 1

**How to reproduce:** Open the app. The expense list says “Newest first”. The first row is Wine (7 Mar). Board game (15 Mar) is further down.

**What is wrong:** The list is showing oldest expenses first. Newest should be at the top.

**What I changed:**
- In `src/components/ExpenseList.jsx`, changed the sort comparator from `dateValue(a.date) - dateValue(b.date)` to `dateValue(b.date) - dateValue(a.date)` so expenses are sorted descending (newest first).
- In `src/lib/format.js`, updated `dateValue` to parse string dates into valid millisecond timestamps (`getTime()`) rather than returning raw date strings (which resulted in `NaN` during arithmetic subtraction) and updated `formatDate` to format both Date objects and date strings properly.

---

## Bug 2

**How to reproduce:** In the expense list, click "Delete" on the top expense ("Board game" on 15 Mar) or filter/search expenses and edit an expense amount.

**What is wrong:** The app deleted or updated the wrong expense. Deletion and editing used array index `index` from the filtered/sorted list, which did not correspond to the index in the underlying `expenses` state array. Also, using `key={index}` caused React to retain stale input state across list re-renders.

**What I changed:**
- In `src/state/store.js`, updated `DELETE_EXPENSE` and `UPDATE_EXPENSE` actions in `reducer` to identify expenses by `action.id` instead of array index.
- In `src/components/ExpenseList.jsx`, keyed rows by `expense.id` (`key={expense.id}`), passed `expense.id` to `onDelete` and `onSaveAmount`, and added a `useEffect` in `ExpenseRow` to synchronize input `draft` with `expense.amount`.
- In `src/App.jsx`, updated `onDelete` and `onUpdate` handlers to dispatch actions with `id`.

---

## Bug 3

**How to reproduce:**

**What is wrong:**

**What I changed:**

---
