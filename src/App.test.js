// In App.test.js
import ProfilePage from './pages/profilePage/profilePage'; // Adjust the path accordingly

test('renders ProfilePage component', () => {
  const characterData = {
    // Provide a sample character data here based on your application structure
    id: 1,
    name: 'Rick Sanchez',
    // ... other character properties
  };

  render(
    <MemoryRouter initialEntries={[`/profile/${characterData.id}`]}>
      <Routes>
        <Route
          path="/profile/:id"
          element={<ProfilePage character={characterData} />}
        />
      </Routes>
    </MemoryRouter>
  );

  // Your assertions...
});
