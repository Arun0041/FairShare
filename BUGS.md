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

**How to reproduce:** Look at the "Balances" card on the right side of the app.

**What is wrong:** The labels and styling for member balances were completely inverted. Members with a positive balance (who paid more than their share and should be credited by the group) were displayed in red with "owes $X.XX", while members with a negative balance (who owe money to the group) were displayed in green with "is owed $X.XX".

**What I changed:**
- In `src/components/BalancesPanel.jsx`, swapped the conditions and CSS classes so that `bal > 0.005` displays `"is owed ${formatMoney(bal)}"` with class `"owed"`, and `bal < -0.005` displays `"owes ${formatMoney(-bal)}"` with class `"owe"`.

---

## Bug 4

**How to reproduce:** Check an expense where the payer is not part of the split (such as the default "Uber to airport" expense: $60 paid by Diya Patel, split equally only between Aisha and Ben). Check Diya's balance in the Balances panel.

**What is wrong:** The payer who was not involved in the split had a portion of the bill deducted from their balance anyway. In the Uber example, Diya paid $60 and consumed $0, but was only credited $30 because the code subtracted $60 / 2 from her balance. This violated the zero-sum principle across the group.

**What I changed:**
- In `src/lib/balances.js`, removed the erroneous condition that subtracted `amount / n` from the payer when the payer was not in `splitWith`. Payer balances are credited the full amount paid, and only members in `splitWith` have their shares deducted.

---

## Bug 5

**How to reproduce:**

**What is wrong:**

**What I changed:**

---
